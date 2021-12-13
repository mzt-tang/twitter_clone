require "test_helper"

class Api::V2::PostsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    sign_in users(:user1)
  end
  
  test "create a basic post" do
    post "create",
      params: { post: { tweet: "can create" } }
    assert_response :success
  end

  test "show all posts" do
    get "index"
    assert_response :success
  end
  
  test "show a post" do
    @post = posts(:valid)
    @post.save

    get "show",
      params: { id: @post.id }
    assert_response :success
  end

  test "delete a post" do
    @post = posts(:valid)
    @post.save

    delete "destroy",
      params: { id: @post.id }
    assert_response :success
  end

end
