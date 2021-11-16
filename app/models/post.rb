class Post < ApplicationRecord
    validates :tweet, presence: true, length: { maximum: 500}
end