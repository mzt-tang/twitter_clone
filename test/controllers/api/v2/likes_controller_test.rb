require 'test_helper'

module Api::V2
  class LikesControllerTest < ActionController::TestCase
    include Devise::Test::ControllerHelpers

    setup do
      sign_in users(:user1)
      @post = posts(:valid)
      @second_post = posts(:another_user_post)
      @user2 = users(:user2)
      Like.destroy_all
    end

    test 'show all likes' do
      @post.save

      get 'index', params: { post_id: @post.id }
      assert_response :success
    end

    test 'create and show a like on a post' do
      @second_post.save
      
      before_like_post_count = @second_post.likes.count

      post 'create', params: { post_id: @second_post.id }
      assert_response :success

      after_like_post_count = @second_post.likes.count
      post_likes_difference = after_like_post_count - before_like_post_count
      assert_equal 1, post_likes_difference

      post_like_1 = @response.parsed_body

      get 'show', params: { post_id: @second_post.id, id: post_like_1['id'] }
      assert_response :success

      post_like_2 = @response.parsed_body
      assert_equal post_like_1['id'], post_like_2['id']
    end

    test 'create a invalid like (current user trying to like own post)' do
      @post.save
      before_like_post_count = @post.likes.count

      post 'create', params: { post_id: @post.id }
      assert_response :unprocessable_entity

      failed_like = @response.parsed_body
      assert_equal 'User cannot like own post!', failed_like['error']

      after_like_post_count = @post.likes.count
      post_likes_difference = after_like_post_count - before_like_post_count
      assert_equal 0, post_likes_difference
    end

    test 'create a invalid like by trying to like the same post twice' do
      @second_post.save
      before_like_post_count = @second_post.likes.count

      post 'create', params: { post_id: @second_post.id }
      assert_response :success

      post 'create', params: { post_id: @second_post.id }
      assert_response :unprocessable_entity

      failed_like = @response.parsed_body
      assert_equal 'User can only like a post once', failed_like['error']

      after_like_post_count = @second_post.likes.count
      post_likes_difference = after_like_post_count - before_like_post_count
      assert_equal 1, post_likes_difference
    end
  end
end
