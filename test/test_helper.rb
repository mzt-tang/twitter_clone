require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/test/'
end
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'
require 'capybara/minitest'
require 'capybara/apparition'
require 'capybara/poltergeist'

WEB_RESPONSE_MAX_WAITING_TIME = 120

Capybara.register_driver :apparition do |app|
  Capybara::Apparition::Driver.new(app, headless: true, timeout: WEB_RESPONSE_MAX_WAITING_TIME)
end

Capybara.javascript_driver = :chrome

Capybara.register_driver :apparition_ignore_js_errors do |app|
  Capybara::Apparition::Driver.new(app, js_errors: false, timeout: WEB_RESPONSE_MAX_WAITING_TIME)
end

Capybara.register_driver :chrome do |app|
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.open_timeout = 10
  client.read_timeout = WEB_RESPONSE_MAX_WAITING_TIME
  Capybara::Selenium::Driver.new(app, browser: :chrome, http_client: client)
end

class ActionDispatch::IntegrationTest
  fixtures :all
  
  # Make the Capybara DSL available in all integration tests
  include Capybara::DSL
  # Make `assert_*` methods behave like Minitest assertions
  include Capybara::Minitest::Assertions
  
  include Devise::Test::IntegrationHelpers
  include Warden::Test::Helpers
  
  # Reset sessions and driver between tests
  teardown do
    Capybara.reset_sessions!
    Capybara.current_driver = :apparition
  end
end

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  include Devise::Test::IntegrationHelpers
  include Warden::Test::Helpers
end
