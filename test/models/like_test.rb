require "test_helper"

class LikeTest < ActiveSupport::TestCase
  def setup
    @post = posts(:valid)
  end

  test 'create a like' do
    like = @post.likes.build(user_id: @post.user.id)

    assert like.valid?
    assert like.save
  end
end
