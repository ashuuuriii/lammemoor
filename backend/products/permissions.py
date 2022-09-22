from rest_framework import permissions


class IsStaffOrReadOnly(permissions.BasePermission):
    # allow all users to view list and objects
    # only allow staff to edit
    def has_permission(self, request, view):
        return bool(
            request.method in permissions.SAFE_METHODS
            or request.user
            and request.user.is_staff
        )

    def has_object_permission(self, request, view, obj):
        return bool(
            request.method in permissions.SAFE_METHODS
            or request.user
            and request.user.is_staff
        )
