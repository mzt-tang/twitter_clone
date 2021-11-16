9.times do |i|
    Post.create(
      tweet: "Post #{i + 1}",
    )
  end