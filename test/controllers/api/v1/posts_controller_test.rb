require "test_helper"

class Api::V1::PostsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers
  
  test "can see the welcome page" do
    post "create",
      params: { post: { tweet: "can create" } }
  end
end
