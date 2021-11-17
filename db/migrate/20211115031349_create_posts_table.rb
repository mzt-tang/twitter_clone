class CreatePostsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :posts_tables do |t|
      t.text :tweet

      t.timestamps
    end
  end
end
