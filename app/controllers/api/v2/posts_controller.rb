class Api::V2::PostsController < ApplicationController
  before_action :find_post, only: [:show, :destroy]

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts
  end

  def create
    new_post = current_user.posts.build(post_params)
    if new_post.save
      render json: new_post
    else
      render json: new_post.errors.full_messages
    end
  end

  def show
    if @post
      render json: @post
    else
      render json: { error: "post is nil" }
    end
  end

  def destroy
    @post.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def post_params
    params.require(:post).permit(:tweet)
  end

  def find_post
    @post = Post.find(params[:id])
  end
end
