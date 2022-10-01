from rest_framework import serializers

from .models import Product, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        exclude = ["pdf", "price_id", "pdf_price_id", "user"]

    def get_reviews(self, obj):
        items = obj.review_set.all()
        serializer = ReviewSerializer(items, many=True)
        return serializer.data
