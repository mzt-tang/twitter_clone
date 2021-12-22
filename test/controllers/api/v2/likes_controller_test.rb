require 'test_helper'

module Api::V2
  class LikesControllerTest < ActionController::TestCase
    include Devise::Test::ControllerHelpers

    setup do
      @user1 = users(:user1)
      @user2 = users(:user2)
      @user3 = users(:user3)
      sign_in @user1

      @post = posts(:valid)
      @second_post = posts(:another_user_post)
      @like = likes(:like1)
    end

    test 'show a like on a post' do
      get 'show', params: { post_id: @like.post.id, id: @like.id }
      assert_response :success

      shown_like = @response.parsed_body
      assert_equal @like.id, shown_like['id']
    end

    test 'show all likes' do
      Like.destroy_all
      Like.create!(user: @user2, post: @post)
      Like.create!(user: @user3, post: @post)

      get 'index', params: { post_id: @post.id }
      assert_response :success

      all_likes = @response.parsed_body
      assert_equal all_likes.length, 2
    end

    test 'create a like on a post' do
      Like.destroy_all
      
      assert_difference('@second_post.likes.count') do
        post 'create', params: { post_id: @second_post.id }
        assert_response :success
      end
    end


    test 'create a invalid like (current user trying to like own post)' do
      Like.destroy_all

      assert_difference('@post.likes.count', 0) do
        post 'create', params: { post_id: @post.id }
        assert_response :unprocessable_entity
  
        failed_like = @response.parsed_body
        assert_equal 'User cannot like own post!', failed_like['error']
        assert_equal 0, @post.likes.count
      end
    end

    test 'create a invalid like by trying to like the same post twice' do
      Like.destroy_all

      assert_difference('@second_post.likes.count') do
        2.times do
          post 'create', params: { post_id: @second_post.id }
        end
        assert_response :unprocessable_entity
  
        failed_like = @response.parsed_body
        assert_equal 'User can only like a post once', failed_like['error']
      end
    end
  end
end
