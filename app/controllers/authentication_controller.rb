class AuthenticationController < ApplicationController
  before_action :authenticate_user!, except: [:show_user_content!]
  def show_user_content!
  end
end
