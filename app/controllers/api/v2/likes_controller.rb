class Api::V2::LikesController < ApplicationController
  before_action :find_post
  before_action :find_like, only: [:show]

  def index
    likes = @post.likes
    render json: likes
  end

  def create
    if @post.user == current_user
      return
    end

    @like = @post.likes.create(user_id: current_user.id)

    if @like.valid?
      render json: @like
    else
      render json: { error: @like.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def show
    render json: @like
  end
  
  def unlike
    if already_liked?
      Like.where(user_id: current_user.id, post_id: params[:post_id]).destroy_all
    end
  end

  private

  def already_liked?
    Like.where(user_id: current_user.id, post_id: params[:post_id]).exists?
  end

  def find_like
    @like = @post.likes.find(params[:id])
  end
  
  def find_post
    @post = Post.find(params[:post_id])
  end
end
