class Api::V2::LikesController < ApplicationController
  before_action :find_post
  before_action :find_like, only: [:show]

  def index
    likes = @post.likes
    render json: likes
  end

  def create
    if @post.user == current_user
      render json: { error: 'user cannot like own post!' }, status: :unprocessable_entity and return
    end

    @like = @post.likes.build(user_id: current_user.id)

    if @like.save
      render json: @like
    else
      render json: { error: @like.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def show
    if @like
      render json: @like
    else
      render json: { error: "like is nil" }
    end
  end

  def unlike
    Like.where(user_id: current_user.id, post_id: params[:post_id]).destroy_all
  end

  def liked
    render json: already_liked?
  end

  def post_belongs_to_user
    if @post.user == current_user
      render json: true
    else
      render json: false
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
