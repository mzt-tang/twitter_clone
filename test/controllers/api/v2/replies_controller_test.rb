require "test_helper"

class Api::V2::RepliesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

    setup do
      sign_in users(:user1)
      @post = posts(:valid)
    end

    test 'show all replies' do
      @post.save

      get 'index', params: { post_id: @post.id }
      assert_response :success
    end

  test "create and show a basic reply" do
    @post.save

    post "create", params: { reply: { post_id: @post.id, comment: "test comment" }}
    assert_response :success

    reply = @response.parsed_body
    assert_equal "test comment", reply["comment"]

    get "show", params: { post_id: @post.id, id: reply["id"] }
    assert_response :success

    reply = @response.parsed_body
    assert_equal 'test comment', reply['comment']
  end

    test 'create a invalid reply' do
      @post.save

    post "create", params: { reply: { post_id: @post.id, comment: "" }}
    assert_response :unprocessable_entity

    reply = @response.parsed_body
    assert_equal "Comment can't be blank", reply["error"]
    
  end
end
