class DropPostsTables < ActiveRecord::Migration[6.0]
  def change
    drop_table :posts_tables do |t|
      t.text :tweet

      t.timestamp
    end
  end
end
