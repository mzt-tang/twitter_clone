class AuthenticationController < ApplicationController
  before_action :authenticate_user!, except: [:app!]
  def app!
  end
end