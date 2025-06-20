# Generated by Django 5.2.3 on 2025-06-15 19:29

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_customuser_external_id_productquestionmessage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='owner',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owned_stores', to=settings.AUTH_USER_MODEL),
        ),
    ]
