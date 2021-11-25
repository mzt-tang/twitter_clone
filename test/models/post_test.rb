require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @post = posts(:valid)
  end

  test 'valid post and save' do
    assert @post.valid?
    assert @post.save
  end 

  test 'invalid without tweet' do
    @post.tweet = nil
    refute @post.valid?, 'saved post without a tweet'
    assert_not_nil @post.errors[:tweet], 'no validation error for tweet present'
  end

  test 'should not save post without tweet' do
    noTweet = Post.new
    assert_not noTweet.save
  end
end
