class Api::V2::RepliesController < ApplicationController
  before_action :find_post
  before_action :find_reply, only: [:show]

  def index
    replies = @post.replies
    render json: replies
  end

  def create
    @reply = current_user.replies.build(reply_params)

    if @reply.save
      render json: @reply
    else
      render json: { error: @reply.errors.full_messages.to_sentence }, status: :unprocessable_entity
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
