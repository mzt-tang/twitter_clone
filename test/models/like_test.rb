require "test_helper"

class LikeTest < ActiveSupport::TestCase
  def setup
    @post = posts(:valid)
  end

  test 'create a like' do
    assert @post.valid?
    assert @post.save

    like = @post.likes.build(user_id: @post.user.id)

    assert like.valid?
    assert like.save
  end 

  test 'invalid without tweet' do
    @post.tweet = nil
    refute @post.valid?, 'saved post without a tweet'
    assert_not_nil @post.errors[:tweet], 'no validation error for tweet present'
  end

end
