class Api::V2::RepliesController < ApplicationController
  before_action :find_post, only: [:index, :show]
  before_action :find_reply, only: [:show]

  def index
    replies = @post.replies
    render json: replies
  end

  def create
    new_reply = current_user.replies.build(reply_params)

    if new_reply.save
      render json: new_reply
    else
      render json: { error: new_reply.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def show
    render json: @reply
  end

  private

  def find_reply
    @reply = @post.replies.find(params[:id])
  end

  def find_post
    @post = Post.find(params[:post_id])
  end

  def reply_params
    params.require(:reply).permit(:post_id, :comment)
  end
end
