# Generated by Django 4.2 on 2023-08-30 19:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_user_bookid_favorites_user_bookid_favorites'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='bookmarker',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bookmarker_book', to=settings.AUTH_USER_MODEL, verbose_name='Кто добавил в избранное'),
        ),
        migrations.AlterField(
            model_name='book',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owner_book', to=settings.AUTH_USER_MODEL, verbose_name='Кто забронировал'),
        ),
    ]
