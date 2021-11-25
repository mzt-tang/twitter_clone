require 'test_helper'

class AppFlowTest < ActionDispatch::IntegrationTest
  test "can see the posts page" do
    get "/"
    assert_select "title", "TwitterCopy"
  end
end
