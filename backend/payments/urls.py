from django.urls import path

from .views import StripePaymentIntentView, StripeWebhookView

urlpatterns = [
    path(
        "create-payment-intent",
        StripePaymentIntentView.as_view(),
        name="payment-intent",
    ),
    path("webhook/stripe/", StripeWebhookView.as_view(), name="stripe-webhook"),
]
