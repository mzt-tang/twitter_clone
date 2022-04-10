require 'test_helper'

class Api::V2::RepliesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

    setup do
      @user = users(:user1)
      @post = posts(:valid)
      @reply = replies(:reply1)
      sign_in @user
    end

    test 'show all replies' do
      get 'index', params: { post_id: @post.id }
      assert_response :success
    end

    test 'create a new reply' do
      post 'create', params: { reply: { post_id: @post.id, comment: 'test comment' }}
      assert_response :success

      reply = @response.parsed_body
      assert_equal 'test comment', reply['comment']
    end

    test 'show a reply' do
      get 'show', params: { post_id: @reply.post.id, id: @reply.id }
      assert_response :success

      shown_reply = @response.parsed_body
      assert_equal @reply.comment, shown_reply['comment']
    end

    test 'create a invalid reply' do
      post 'create', params: { reply: { post_id: @post.id, comment: '' }}
      assert_response :unprocessable_entity

      reply = @response.parsed_body
      assert_equal 'Comment can\'t be blank', reply['error']
    end

    test 'index shows the correct number of replies' do
      Reply.destroy_all

      5.times do
        Reply.create!(user: @user, post: @post, comment: 'monkeys')
      end

      get 'index', params: { post_id: @post.id }
      assert_response :success

      all_replies = @response.parsed_body
      assert_equal 5, all_replies.size
    end
end
