class AuthenticationController < ApplicationController
  before_action :authenticate_user!, except: [:show_app_content!]
  def show_app_content!
  end
end
