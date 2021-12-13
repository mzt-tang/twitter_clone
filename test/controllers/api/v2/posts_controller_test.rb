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
    
  end

end
