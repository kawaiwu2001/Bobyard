import json
from django.core.management.base import BaseCommand
from comments.models import Comment
from django.utils.dateparse import parse_datetime

class Command(BaseCommand):
    help = "Load comments from JSON file into the database"

    def handle(self, *args, **kwargs):
        try:
            with open('./comments/management/commands/Copy of comments.json', 'r') as file:
                data = json.load(file)

                for item in data.get('comments', []):  # Ensure list format
                    comment_id = int(item["id"])  # Ensure ID is an integer
                    comment, created = Comment.objects.update_or_create(
                        id=comment_id,  # Explicitly set the ID
                        defaults={
                            "author": item["author"],
                            "text": item["text"],
                            "date": parse_datetime(item["date"]),
                            "likes": int(item["likes"]),
                            "image": item["image"] if item["image"] else None
                        }
                    )

                    if created:
                        self.stdout.write(self.style.SUCCESS(f"Added comment {comment_id}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Updated comment {comment_id}"))

            self.stdout.write(self.style.SUCCESS("Successfully loaded all comments!"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error loading comments: {e}"))
