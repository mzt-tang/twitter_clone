class Api::V2::PostsController < ApplicationController
  def index
    post = Post.all.order(created_at: :desc)
    render json: current_user.posts.order(created_at: :desc)
  end

  def create
    post = current_user.posts.create!(post_params);
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
