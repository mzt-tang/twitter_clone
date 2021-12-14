require "test_helper"

class Api::V2::PostsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

    setup do
      sign_in users(:user1)
      @post = posts(:valid)
    end

    test 'show all posts' do
      get 'index'
      assert_response :success
    end

    test 'create a basic post' do
      post 'create',
           params: { post: { tweet: 'can create' } }
      assert_response :success
    end

    test 'index shows the correct number of posts' do
      Post.destroy_all

      5.times do
        post 'create',
             params: { post: { tweet: 'can create' } }
        assert_response :success
      end

      get 'index'
      assert_response :success

      all_posts = @response.parsed_body
      assert_equal 5, all_posts.size
    end

    test 'show a post' do
      @post.save

      get 'show',
          params: { id: @post.id }
      assert_response :success

      valid_post = @response.parsed_body
      assert_equal @post.tweet, valid_post['tweet']
    end

    test 'delete a post' do
      @post.save

    delete "destroy",
      params: { id: @post.id }
    assert_response :success
  end

  test "create a invalid 0 words post" do
    post "create",
      params: { post: { tweet: "" } }
    assert_response :unprocessable_entity

    invalid_post = @response.parsed_body
    assert_equal "Tweet can't be blank", invalid_post["error"]
  end

end
