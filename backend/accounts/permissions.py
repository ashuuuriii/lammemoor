from rest_framework import permissions


class IsStaffOrOwnerOnly(permissions.BasePermission):
    # only staff users have object permissions to all objects
    # regular users have object permission for their own object
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user
            and request.user.is_staff
            or request.user
            and request.user == obj
        )
