def get_store_for_user(user):
    if user.is_manager() and user.store:
        return user.store
    elif user.is_owner() and hasattr(user, 'owned_store') and user.owned_store:
        return user.owned_store
    return None