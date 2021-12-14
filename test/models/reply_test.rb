require "test_helper"

class ReplyTest < ActiveSupport::TestCase
  def setup
    @post = posts(:valid)
  end

  test 'valid reply' do
    assert @post.valid?
    assert @post.save

    @reply = @post.replies.build({user_id: @post.user.id, comment: "test comment"})
    
    assert @reply.valid?
    assert @reply.save
  end
end
