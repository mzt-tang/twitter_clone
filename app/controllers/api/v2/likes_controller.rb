class Api::V2::LikesController < ApplicationController
  before_action :find_post
  before_action :find_like, only: [:show]

  def index
    likes = @post.likes
    render json: likes
  end

  def create
    if check_user_post_like_valid?
      render json: { error: 'User cannot like own post!' }, status: :unprocessable_entity and return
    end

    @like = @post.likes.build(user_id: current_user.id)

    if @like.save
      render json: @like
    else
      render json: { error: @like.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def show
    render json: @like
  end

  def unlike
    Like.where(user_id: current_user.id, post_id: params[:post_id]).destroy_all
  end

  def liked
    render json: already_liked?
  end

  def post_belongs_to_user
    render json: check_user_post_like_valid?
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

  def check_user_post_like_valid?
    @post.user == current_user
  end
end
