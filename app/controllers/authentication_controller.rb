class AuthenticationController < ApplicationController
  before_action :authenticate_user!, only: [:app]
  def login!
  end

  def app
  end
end