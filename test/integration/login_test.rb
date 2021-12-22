require 'test_helper'

class LoginTest < ActionDispatch::IntegrationTest
  setup do
    Capybara.current_driver = Capybara.javascript_driver # :selenium by default
    visit '/users/sign_in'
  end

  test 'shows login initially' do
    assert has_current_path?('/users/sign_in')
  end

  test 'create an account, sign out and log in again' do
    new_email = 'some.email@example.com'
    new_password = 'password'
    click_on 'Sign up'
    assert has_current_path?('/users/sign_up')
    
    fill_in 'new_email', with: new_email
    fill_in 'new_password', with: new_password
    fill_in 'confirm_password', with: new_password
    click_on 'Sign up'
    assert has_current_path?('/')
    assert page.has_content?("Twitter Clone")
    
    sleep(inspection_time=0.5)
    click_link('Logout')

    assert has_current_path?('/users/sign_in')
    
    fill_in 'user_email', with: new_email
    fill_in 'user_password', with: new_password
    click_on 'Log in'

    assert has_current_path?('/')
    assert page.has_content?("Twitter Clone")
  end
end
