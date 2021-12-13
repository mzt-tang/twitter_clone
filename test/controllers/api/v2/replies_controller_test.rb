require "test_helper"

class Api::V2::RepliesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    sign_in users(:user1)
  end
  
  test "create a basic reply" do
    @post = posts(:valid)
    @post.save

    post "create", params: { reply: { post_id: @post.id, comment: "test comment" }}
    assert_response :success

    reply = @response.parsed_body
    assert_equal "test comment", reply["comment"]
  end

  test "create a invalid reply" do
    @post = posts(:valid)
    @post.save

    post "create", params: { reply: { post_id: @post.id, comment: "" }}
    assert_response :unprocessable_entity

    reply = @response.parsed_body
    assert_equal "Comment can't be blank", reply["error"]
    
  end

  test "show all replies" do
    @post = posts(:valid)
    @post.save

    get "index"
    assert_response :success
  end
  
  # test "show a post" do
  #   post "create",
  #     params: { post: { tweet: "create a post" } }
  #   assert_response :success

  #   get "show",
  #     params: { id: 1}
  #   assert_response :success
  # end

end
