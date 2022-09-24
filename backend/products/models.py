from django.db import models
from django.contrib.auth import get_user_model


class Product(models.Model):
    CATEGORIES = (
        (1, "1840s"),
        (2, "1850s"),
        (3, "1860s"),
        (4, "1870s"),
        (5, "1880s"),
        (6, "1890s"),
        (7, "Edwardian"),
    )

    user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    pdf = models.FileField(upload_to="pdfs/", null=True, blank=True)
    category = models.PositiveSmallIntegerField(choices=CATEGORIES, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    n_reviews = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    pdf_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    n_stock = models.IntegerField(null=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    price_id = models.CharField(max_length=255, null=True, blank=True)
    pdf_price_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name
