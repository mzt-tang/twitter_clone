class Api::V2::LikesController < ApplicationController
  before_action :find_post
  before_action :find_like, only: [:destroy]

  def index
    likes = @post.likes
    render json: likes
  end

  def create
    @like = @post.likes.create(user_id: current_user.id)

    if @like.valid?
      render json: @like
    else
      render json: { error: @like.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
    # redirect_to post_path(@post)
  end

  def show
    @like = find_like
    render json: @like
  end
  
  def unlike
    if already_liked?
      Like.where(user_id: current_user.id, post_id: params[:post_id]).destroy_all
    end
  end

  private

  def find_like
    @like = @post.likes.find(params[:id])
  end

  def already_liked?
    Like.where(user_id: current_user.id, post_id: params[:post_id]).exists?
  end

  def find_post
    @post = Post.find(params[:post_id])
  end
end
