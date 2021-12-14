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
    no_tweet = Post.new
    assert_not no_tweet.save
  end

  test 'invalid for tweets over 500 characters' do
    @post.tweet = "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789" + 
    "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789" +
    "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789" +
    "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789" +
    "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"
    
    assert @post.valid?

    @post.tweet += "1"

    assert_not @post.valid?
  end
end
