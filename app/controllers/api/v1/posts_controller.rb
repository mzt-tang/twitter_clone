class Api::V1::PostsController < ApplicationController
  def index
    if user_signed_in?
      post = Post.all.order(created_at: :desc)
      render json: post
  end

  def create
    if user_signed_in?
      post = Post.create!(post_params)
      if post
        render json: post
      else
        render json: post.errors.full_messages
      end
  end

  def show
    if user_signed_in?
      if post
        render json: post
      else
        render json: post.errors.full_messages
      end
  end

  def destroy
    if user_signed_in?
      post&.destroy
      render json: { message: 'Post deleted!' }
  end

  private

  def post_params
    params.require(:post).permit(:tweet)
  end

  def post
    @post ||= Post.find(params[:id])
  end
end
