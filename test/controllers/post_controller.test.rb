require "test_helper"

class HelperTest < ActionDispatch::IntegrationTest
  test "can see the welcome page" do
    post "/posts"
      params: { post: { tweet: "can create" } 
  end
end
