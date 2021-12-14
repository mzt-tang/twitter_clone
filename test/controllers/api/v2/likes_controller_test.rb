require 'test_helper'

module Api::V2
  class LikesControllerTest < ActionController::TestCase
    include Devise::Test::ControllerHelpers

    setup do
      sign_in users(:user1)
      @post = posts(:valid)
      @second_post = posts(:another_user_post)
      @user2 = users(:user2)
    end

    test 'show all likes' do
      @post.save

      get 'index', params: { post_id: @post.id }
      assert_response :success
    end

    test 'create a like on a post' do
      Like.destroy_all
      @second_post.save
      
      before_like_post_count = @second_post.likes.count

      post 'create', params: { post_id: @second_post.id }
      assert_response :success

      after_like_post_count = @second_post.likes.count

      post_likes_difference = after_like_post_count - before_like_post_count

      assert_equal 1, post_likes_difference
    end

    # test 'index shows the correct number of replies' do
    #   Reply.destroy_all

    #   @post.save

    #   5.times do
    #     post 'create',
    #          params: { reply: { post_id: @post.id, comment: 'test comment' } }
    #     assert_response :success
    #   end

    #   get 'index', params: { post_id: @post.id }
    #   assert_response :success

    #   all_replies = @response.parsed_body
    #   assert_equal 5, all_replies.size
    # end

    # test 'create a invalid reply' do
    #   @post.save

    #   post 'create', params: { reply: { post_id: @post.id, comment: '' } }
    #   assert_response :unprocessable_entity

    #   reply = @response.parsed_body
    #   assert_equal "Comment can't be blank", reply['error']
    # end
  end
end
