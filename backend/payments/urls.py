from django.urls import path

from .views import StripePaymentIntentView

urlpatterns = [
    path(
        "create-payment-intent",
        StripePaymentIntentView.as_view(),
        name="payment-intent",
    )
]
