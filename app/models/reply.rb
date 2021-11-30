class Reply < ApplicationRecord
  validates :reply, presence: true, length: { maximum: 500 }

  belongs_to :user
  belongs_to :post
end
