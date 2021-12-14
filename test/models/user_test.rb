require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:user1)
  end

  test 'valid reply' do
    assert @user.valid?
    assert @user.save
  end
end
