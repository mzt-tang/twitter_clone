class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :rememberable, :validatable
  
  has_many :posts
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post
  has_many :replies, dependent: :destroy
  has_many :post_replies, through: :replies, source: :post
end
