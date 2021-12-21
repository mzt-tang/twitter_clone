require 'test_helper'

class PostsAndLikesTest < ActionDispatch::IntegrationTest
  setup do
    Capybara.current_driver = Capybara.javascript_driver # :selenium by default
  end

  test 'create some posts' do
    user = users(:user1)
    visit '/users/sign_in'
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'password'
    click_on 'Log in'

    fill_in 'post-text-area', with: 'something something something'
    click_on 'Tweet'
    # assert

    fill_in 'post-text-area', with: 'more stuff'
    click_on 'Tweet'
    # assert

    fill_in 'post-text-area', with: 'a sentence for integration testing'
    click_on 'Tweet'
    # assert

    fill_in 'post-text-area', with: 'even more tweets'
    click_on 'Tweet'
    # assert

    fill_in 'post-text-area', with: 'this is the last one'
    click_button 'Tweet'
    # assert
  end

  test 'like and unlike a post' do
    user = users(:user2)
    visit '/users/sign_in'
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'password'
    click_on 'Log in'

    find_button('post-like-button', match: :first).click
    # assert
    find_button('post-like-button', match: :first).click
    # assert
  end

  test 'reply to a post' do
    user = users(:user1)
    visit '/users/sign_in'
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'password'
    click_on 'Log in'

    
  end
end
