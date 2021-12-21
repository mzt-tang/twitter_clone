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
    assert page.has_content?('something something something')

    fill_in 'post-text-area', with: 'even more tweets'
    click_on 'Tweet'
    assert page.has_content?('even more tweets')

    fill_in 'post-text-area', with: 'this is the last one'
    click_button 'Tweet'

    assert page.has_content?('something something something')
    assert page.has_content?('even more tweets')
    assert page.has_content?('this is the last one')
  end

  test 'like and unlike a post' do
    user = users(:user2)
    visit '/users/sign_in'
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'password'
    click_on 'Log in'

    find_button('post-like-button', match: :first).click
    find_button('post-unlike-button', match: :first).click # asserts the first click has liked the post
    find('.likes-and-replies', match: :first).find_button('post-like-button', match: :first).click # asserts the second click has unliked the post
    find('.likes-and-replies', match: :first).find_button('post-unlike-button', match: :first).click # asserts the third click has liked the post again
  end

  test 'reply to a post' do
    user = users(:user1)
    visit '/users/sign_in'
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'password'
    click_on 'Log in'

    find_button('reply-modal-button', match: :first).click
    assert page.has_content?('Comments')
    fill_in 'reply-text', with: 'This is a test comment!'
    click_button 'reply'
    fill_in 'reply-text', with: ''
    assert page.has_content?('This is a test comment')
  end
end
