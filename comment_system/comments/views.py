from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.utils.timezone import now
from .models import Comment
from .serializers import CommentSerializer

# Create your views here.
class CommentListCreateView(generics.ListCreateAPIView):
    """Handles listing all comments and adding new ones."""
    queryset = Comment.objects.all().order_by('-date', '-id')  # Sort by date, then by ID
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        """Creates a new comment with 'Admin' as the author and current timestamp."""
        data = request.data.copy()
        data['author'] = "Admin"  # Force author to be 'Admin'
        data['date'] = now()  # Set current timestamp
        data['likes'] = 0  # New comments start with 0 likes

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentUpdateView(generics.UpdateAPIView):
    """Handles updating comments."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)

        instance.text = request.data.get("text", instance.text)
        instance.date = now()  # Update timestamp
        instance.save()

        return Response(CommentSerializer(instance).data)

class CommentDeleteView(generics.DestroyAPIView):
    """Handles deleting comments."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance:
            return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response({'message': 'Comment deleted successfully.'}, status=status.HTTP_200_OK)
