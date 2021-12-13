require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/test/'
end
ENV['RAILS_ENV'] ||= 'test'
require "rails/test_help"

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  include Devise::Test::IntegrationHelpers
  include Warden::Test::Helpers
end
