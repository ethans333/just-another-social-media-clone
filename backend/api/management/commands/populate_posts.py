from django.core.management.base import BaseCommand
from faker import Faker
from api.models import Post, Comment
from django.contrib.auth import get_user_model
import random

User = get_user_model()


class Command(BaseCommand):
    help = 'Populate the database with fake posts and users'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Create some fake users
        users = []
        for _ in range(5):
            user = User.objects.create_user(
                username=fake.user_name(),
                password=fake.password(),
                email=fake.email(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                profile_picture_url=f"https://i.pravatar.cc/300?u={fake.uuid4()}",
                bio=fake.text(max_nb_chars=100),
                location=fake.city()
            )
            users.append(user)

        # Create fake posts
        for _ in range(50):
            post = Post.objects.create(
                user=random.choice(users),
                content=fake.text(max_nb_chars=200),
                image_url=f"https://picsum.photos/seed/{fake.uuid4()}/600/600",
                created_at=fake.date_time_this_year(),
                likes=random.randint(0, 100)
            )

            # Add fake comments to each post
            for _ in range(random.randint(1, 5)):
                Comment.objects.create(
                    post=post,
                    user=random.choice(users),
                    content=fake.sentence(nb_words=15)
                )

        self.stdout.write(self.style.SUCCESS(
            'Successfully populated database'))
