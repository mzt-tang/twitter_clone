class Api::V1::PostsController < ApplicationController
  def index
    post = Post.all.order(created_at: :desc)
    render json: post
  end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors.full_messages
    end
  end

  def show
    if post
      render json: post
    else
      render json: post.errors.full_messages
    end
  end

  def destroy
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
